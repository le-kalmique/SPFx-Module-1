import * as React from "react";
import * as ReactDom from "react-dom";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
} from "@microsoft/sp-property-pane";
import {
  PropertyFieldFilePicker,
  IFilePickerResult,
} from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";

import * as strings from "ModuleOneWebPartStrings";
import ModuleOne from "./components/ModuleOne/ModuleOne";
import { IModuleOneProps } from "./components/ModuleOne/IModuleOneProps";

import { Version } from "@microsoft/sp-core-library";

export interface IModuleOneWebPartProps {
  description: string;
  title: string;

  file: IFilePickerResult;
}

export default class ModuleOneWebPart extends BaseClientSideWebPart<IModuleOneWebPartProps> {
  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";

  public render(): void {
    const element: React.ReactElement<IModuleOneProps> = React.createElement(
      ModuleOne,
      {
        description: this.properties.description,
        title: this.properties.title,

        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName,
        context: this.context,
      }
    );

    console.log(this.properties.title);

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then((message) => {
      this._environmentMessage = message;
    });
  }

  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) {
      // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app
        .getContext()
        .then((context) => {
          let environmentMessage: string = "";
          switch (context.app.host.name) {
            case "Office": // running in Office
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOffice
                : strings.AppOfficeEnvironment;
              break;
            case "Outlook": // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentOutlook
                : strings.AppOutlookEnvironment;
              break;
            case "Teams": // running in Teams
              environmentMessage = this.context.isServedFromLocalhost
                ? strings.AppLocalEnvironmentTeams
                : strings.AppTeamsTabEnvironment;
              break;
            default:
              throw new Error("Unknown host");
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(
      this.context.isServedFromLocalhost
        ? strings.AppLocalEnvironmentSharePoint
        : strings.AppSharePointEnvironment
    );
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty(
        "--bodyText",
        semanticColors.bodyText || null
      );
      this.domElement.style.setProperty("--link", semanticColors.link || null);
      this.domElement.style.setProperty(
        "--linkHovered",
        semanticColors.linkHovered || null
      );
    }
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected get disableReactivePropertyChanges(): boolean {
    return false;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: "Title",
                }),
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneSlider("slider", {
                  label: "Slider",
                  min: 0,
                  max: 200,
                  step: 10,
                }),
              ],
            },
          ],
        },
        {
          header: {
            description: "Custom Group",
          },
          groups: [
            {
              groupName: "group 2",
              groupFields: [
                PropertyFieldFilePicker("file", {
                  //@ts-ignore
                  context: this.context,
                  filePickerResult: this.properties.file,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.file = e;
                  },
                  onChanged: (e: IFilePickerResult) => {
                    console.log(e);
                    this.properties.file = e;
                  },
                  key: "filePickerId",
                  buttonLabel: "File Picker",
                  label: "File Picker",
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
