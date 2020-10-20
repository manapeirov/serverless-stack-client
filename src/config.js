export default {
  s3: {
    REGION: "us-east-2",
    BUCKET: "mana-notes-app-uploads",
  },
  apiGateway: {
    REGION: "us-east-2",
    URL: "https://1dwqf2lxva.execute-api.us-east-2.amazonaws.com/prod",
  },
  cognito: {
    REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_NnvF17zHU",
    APP_CLIENT_ID: "2t60q8folahr110ebmqe91ne6a",
    IDENTITY_POOL_ID: "us-east-2:43556d37-7c92-4d34-b0e3-b0b24ca99566",
  },
};

// Identity Pool ARN-   arn:aws:cognito-identity:us-east-2:070704826772:identitypool/us-east-2:43556d37-7c92-4d34-b0e3-b0b24ca99566
// Role name: Cognito_manaNotesAppAuth_Role
// Role name: Cognito_manaNotesAppUnauth_Role
// API Gateway ID: 1dwqf2lxva
// User Pool ARN-   arn:aws:cognito-idp:us-east-2:070704826772:userpool/us-east-2_NnvF17zHU
