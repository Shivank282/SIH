# n8n Workflow Setup for ShopVista Feedback Form

This document explains how to set up an n8n workflow to collect feedback form submissions from ShopVista and store them in a Google Sheet.

## Prerequisites

1. **n8n Instance**: You need access to an n8n instance (self-hosted or cloud)
2. **Google Account**: For Google Sheets integration
3. **Google Cloud Project**: For API credentials

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "ShopVista Feedback"
4. Add the following headers in row 1:
   - A1: `Timestamp`
   - B1: `Name`
   - C1: `Email`
   - D1: `Subject`
   - E1: `Message`
   - F1: `User Agent`
   - G1: `URL`

## Step 2: Set up Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing one
3. Enable Google Sheets API:
   - Go to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create credentials:
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "Service Account"
   - Fill in the details and create
   - Download the JSON key file
   - Note the service account email

## Step 3: Share Google Sheet

1. Open your Google Sheet
2. Click "Share" button
3. Add the service account email (from step 2)
4. Give it "Editor" permissions
5. Copy the Sheet ID from the URL (between `/d/` and `/edit`)

## Step 4: Create n8n Workflow

### Workflow Nodes:

1. **Webhook Node** (Trigger)
   - HTTP Method: POST
   - Path: `/feedback`
   - Response Mode: "On Received"
   - Response Code: 200

2. **Set Node** (Data Processing)
   - Configure to map incoming data:
     ```
     {
       "timestamp": "{{ $json.timestamp }}",
       "name": "{{ $json.name }}",
       "email": "{{ $json.email }}",
       "subject": "{{ $json.subject }}",
       "message": "{{ $json.message }}",
       "userAgent": "{{ $json.userAgent }}",
       "url": "{{ $json.url }}"
     }
     ```

3. **Google Sheets Node** (Data Storage)
   - Operation: "Append Row"
   - Authentication: OAuth2 or Service Account
   - Spreadsheet ID: [Your Sheet ID from Step 3]
   - Sheet: "Sheet1" (or your sheet name)
   - Columns: A, B, C, D, E, F, G
   - Values: 
     ```
     {{ $json.timestamp }},{{ $json.name }},{{ $json.email }},{{ $json.subject }},{{ $json.message }},{{ $json.userAgent }},{{ $json.url }}
     ```

4. **Respond to Webhook Node** (Response)
   - Response Code: 200
   - Response Body: 
     ```json
     {
       "success": true,
       "message": "Feedback submitted successfully"
     }
     ```

## Step 5: Configure Authentication

### For Google Sheets Node:
1. In n8n, go to "Credentials"
2. Create new credential: "Google Sheets OAuth2 API"
3. Fill in:
   - Client ID: [From Google Cloud Console]
   - Client Secret: [From Google Cloud Console]
   - Scope: `https://www.googleapis.com/auth/spreadsheets`
4. Or use Service Account:
   - Upload the JSON key file from Step 2
   - Use Service Account authentication

## Step 6: Test the Workflow

1. Activate the workflow in n8n
2. Copy the webhook URL (something like: `https://your-n8n-instance.com/webhook/feedback`)
3. Update the JavaScript code in `script.js`:
   ```javascript
   const n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/feedback';
   ```
4. Uncomment the actual fetch code in the `submitToN8n` function

## Step 7: Update JavaScript Code

In `script.js`, replace the simulated API call with:

```javascript
async function submitToN8n(formData) {
    const n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/feedback';
    
    const response = await fetch(n8nWebhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });
    
    if (!response.ok) {
        throw new Error('Failed to submit feedback');
    }
    
    return response.json();
}
```

## Workflow JSON Export

Here's a complete n8n workflow JSON that you can import:

```json
{
  "name": "ShopVista Feedback Form to Google Sheets",
  "nodes": [
    {
      "parameters": {
        "httpMethod": "POST",
        "path": "feedback",
        "responseMode": "onReceived",
        "options": {}
      },
      "id": "webhook-trigger",
      "name": "Webhook",
      "type": "n8n-nodes-base.webhook",
      "typeVersion": 1,
      "position": [240, 300]
    },
    {
      "parameters": {
        "values": {
          "string": [
            {
              "name": "timestamp",
              "value": "={{ $json.timestamp }}"
            },
            {
              "name": "name", 
              "value": "={{ $json.name }}"
            },
            {
              "name": "email",
              "value": "={{ $json.email }}"
            },
            {
              "name": "subject",
              "value": "={{ $json.subject }}"
            },
            {
              "name": "message",
              "value": "={{ $json.message }}"
            },
            {
              "name": "userAgent",
              "value": "={{ $json.userAgent }}"
            },
            {
              "name": "url",
              "value": "={{ $json.url }}"
            }
          ]
        }
      },
      "id": "set-data",
      "name": "Set Data",
      "type": "n8n-nodes-base.set",
      "typeVersion": 1,
      "position": [460, 300]
    },
    {
      "parameters": {
        "operation": "appendOrUpdate",
        "documentId": {
          "__rl": true,
          "value": "YOUR_SHEET_ID_HERE",
          "mode": "id"
        },
        "sheetName": {
          "__rl": true,
          "value": "Sheet1",
          "mode": "list"
        },
        "columns": {
          "mappingMode": "defineBelow",
          "value": {
            "A": "={{ $json.timestamp }}",
            "B": "={{ $json.name }}",
            "C": "={{ $json.email }}",
            "D": "={{ $json.subject }}",
            "E": "={{ $json.message }}",
            "F": "={{ $json.userAgent }}",
            "G": "={{ $json.url }}"
          }
        }
      },
      "id": "google-sheets",
      "name": "Google Sheets",
      "type": "n8n-nodes-base.googleSheets",
      "typeVersion": 4,
      "position": [680, 300]
    },
    {
      "parameters": {
        "respondWith": "json",
        "responseBody": "={{ { \"success\": true, \"message\": \"Feedback submitted successfully\" } }}"
      },
      "id": "respond-webhook",
      "name": "Respond to Webhook",
      "type": "n8n-nodes-base.respondToWebhook",
      "typeVersion": 1,
      "position": [900, 300]
    }
  ],
  "connections": {
    "Webhook": {
      "main": [
        [
          {
            "node": "Set Data",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Set Data": {
      "main": [
        [
          {
            "node": "Google Sheets",
            "type": "main",
            "index": 0
          }
        ]
      ]
    },
    "Google Sheets": {
      "main": [
        [
          {
            "node": "Respond to Webhook",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
```

## Security Considerations

1. **Rate Limiting**: Consider adding rate limiting to prevent spam
2. **Validation**: Add server-side validation in n8n
3. **CORS**: Configure CORS if needed
4. **Authentication**: Consider adding API keys for additional security

## Troubleshooting

1. **CORS Issues**: Make sure your n8n instance allows requests from your domain
2. **Authentication**: Verify Google Sheets credentials are correct
3. **Sheet Permissions**: Ensure the service account has access to the sheet
4. **Webhook URL**: Double-check the webhook URL is correct and accessible

## Optional Enhancements

1. **Email Notifications**: Add email notification when feedback is received
2. **Data Validation**: Add validation nodes in n8n
3. **Error Handling**: Add error handling and logging
4. **Analytics**: Track feedback metrics
5. **Auto-Response**: Send automatic confirmation emails

