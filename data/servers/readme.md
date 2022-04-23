# data/servers

This file is just to have the folder structure in the github repo.

When the bot is running, the bot will write and read from JSON files in this folder.

The type definition of the JSON files is:

```dts
export interface BooblServer {
  share: boolean;
  channel: string;
  defaultLanguage: Language;
}
```
