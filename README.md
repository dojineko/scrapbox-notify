# Scrapbox Notify

Notify Scrapbox project updates to Slack and Discord.

## Example

```yml
on:
  schedule:
    - cron: "0 4 * * *"
  workflow_dispatch:
jobs:
  notify:
    runs-on: ubuntu-latest
    steps:
      - uses: dojineko/scrapbox-notify@main
        with:
          project_name: ${{ secrets.PROJECT_NAME }}
          slack_webhook: ${{ secrets.SLACK_WEBHOOK }}
          discord_webhook: ${{ secrets.DISCORD_WEBHOOK }}
```

## Variables

| Variables       | Required | Purpose                                                  |
| --------------- | :------: | -------------------------------------------------------- |
| project_name    |    ✅    | Project name (e.g. `https://scrapbox.io/{project_name}`) |
| slack_webhook   |          | Slack Incoming Webhook                                   |
| discord_webhook |          | Discord Incoming Webhook                                 |
