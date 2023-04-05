import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IModuleOneProps {
  description: string;
  title: string;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  context: WebPartContext;
}
