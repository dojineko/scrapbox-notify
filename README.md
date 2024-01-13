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
          feed_url: ${{ secrets.FEED_URL }}
          slack_webhook: ${{ secrets.SLACK_WEBHOOK }}
          discord_webhook: ${{ secrets.DISCORD_WEBHOOK }}
```

## Variables

| Variables       | Required | Purpose                                                       |
| --------------- | :------: | ------------------------------------------------------------- |
| feed_url        |    ✅    | Feed URL (e.g. `https://scrapbox.io/api/feed/${projectName}`) |
| slack_webhook   |          | Slack Incoming Webhook                                        |
| discord_webhook |          | Discord Incoming Webhook                                      |
