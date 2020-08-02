#!/bin/bash -e

if aws s3api head-bucket --bucket "${BUCKET_NAME}" 2>/dev/null; then
  echo "### Bucket exists: $BUCKET_NAME"
else
  echo "### Bucket does not exist, creating: ${BUCKET_NAME}"
  aws s3 mb s3://"${BUCKET_NAME}"
  aws s3api put-bucket-cors --bucket "${BUCKET_NAME}" --cors-configuration file://./bucket-cors.json
fi

echo "### Creating environment variables..."
{
  echo "AWS_KEY=$AWS_ACCESS_KEY_ID"
  echo "AWS_SECRET=$AWS_SECRET_ACCESS_KEY"
  echo "API_KEY=$API_KEY"
  echo "API_SECRET=$API_SECRET"
} >.env
cat .env

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
FILE_NAME="fantasy-analytics-$TIMESTAMP.zip"

zip -r -qq "$FILE_NAME" build node_modules .env
echo "### Zipped $FILE_NAME successfully."

aws s3 rm "s3://${BUCKET_NAME}" --recursive --exclude "*" --include "*.zip"
aws s3 cp "${FILE_NAME}" "s3://${BUCKET_NAME}/"

echo "### Initiating SAM Deploy..."
STACK_NAME="fantasy-analytics-stack"

sam deploy --template-file ./template.yaml --stack-name "${STACK_NAME}" --capabilities CAPABILITY_IAM \
  --parameter-overrides BucketName="${BUCKET_NAME}" CodeKey="${FILE_NAME}" --no-fail-on-empty-changeset
