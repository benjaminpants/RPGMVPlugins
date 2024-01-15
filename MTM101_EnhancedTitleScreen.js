MTM101 = MTM101 || {}

MTM101.EnhancedTitle = []

MTM101.EnhancedTitle.Parameters = PluginManager.parameters("MTM101_EnhancedTitleScreen");


/*:
 * @author MissingTextureMan101
 * @plugindesc Allows you to add extra options to your title screen.
 * @help
 * This plugin requires basic script knowledge to use to its fullest extent.
 * Beware that this plugin might conflict with other plugins 
 * that add their own options to the title screen, so to avoid that, put it at the bottom of the list.
 * 
 * 
 * @param TitleOptions
 * @type struct<TitleOption>[]
 * @default ["{\"Name\":\"New Game\",\"Script\":\"\\\"this.commandNewGame();\\\"\",\"Visible\":\"true;\",\"Enabled\":\"true;\"}","{\"Name\":\"Continue\",\"Script\":\"\\\"this.commandContinue();\\\"\",\"Visible\":\"true;\",\"Enabled\":\"Window_TitleCommand.prototype.isContinueEnabled();\"}","{\"Name\":\"Options\",\"Script\":\"\\\"this.commandOptions();\\\"\",\"Visible\":\"true;\",\"Enabled\":\"true;\"}","{\"Name\":\"Exit\",\"Script\":\"\\\"this._commandWindow.close();\\\\nthis.fadeOutAll();\\\\nSceneManager.exit();\\\"\",\"Visible\":\"true;\",\"Enabled\":\"true;\"}"]
 * @desc The options shown on the title screen.
 *
 * @param Y Offset
 * @type Number
 * @desc The Y  Offset to apply to the spawned window
 * @min -99999
 * @max 99999
 *
 * @param X Offset
 * @type Number
 * @desc The X Offset to apply to the spawned window
 * @min -99999
 * @max 99999
*/

/*~struct~TitleOption:
 * @param Name
 * @type text
 * @default Button
 * @desc The name of the option.
 *
 * @param Script
 * @type note
 * @default "this._commandWindow.close();\nthis.fadeOutAll();"
 * @desc The code that gets run when the option is chosen
 * 
 * @param Visible
 * @type text 
 * @default true;
 * @desc Whether or not this option will show up on the title screen.
 * 
 * @param Enabled
 * @type text
 * @default true;
 * @desc Whether or not this option will be able to be selected.
 */

MTM101.EnhancedTitle.TitleOptions = [];

var data = JSON.parse(MTM101.EnhancedTitle.Parameters["TitleOptions"]);

var xOff = Number(MTM101.EnhancedTitle.Parameters["X Offset"])
var yOff = Number(MTM101.EnhancedTitle.Parameters["Y Offset"])

for (let i = 0; i < data.length; i++)
{
	MTM101.EnhancedTitle.TitleOptions.push(JSON.parse(data[i]))
	MTM101.EnhancedTitle.TitleOptions[i].Visible = eval(MTM101.EnhancedTitle.TitleOptions[i].Visible);
	MTM101.EnhancedTitle.TitleOptions[i].Enabled = eval(MTM101.EnhancedTitle.TitleOptions[i].Enabled);
	MTM101.EnhancedTitle.TitleOptions[i].Script = eval(MTM101.EnhancedTitle.TitleOptions[i].Script);
};

Scene_Title.prototype.commandCustom = function(scr)
{
	eval(scr);
};

Scene_Title.prototype.createCommandWindow = function() 
{
	this._commandWindow = new Window_TitleCommand();
	for (let i = 0; i < MTM101.EnhancedTitle.TitleOptions.length; i++)
	{
		var titleoption = MTM101.EnhancedTitle.TitleOptions[i];
		this._commandWindow.setHandler(titleoption.Name.concat('_',i), this.commandCustom.bind(this,titleoption.Script));
	}
	this.addWindow(this._commandWindow);
	this._commandWindow.x += xOff
	this._commandWindow.y += yOff
};

Window_TitleCommand.prototype.selectLast = function() {
    if (Window_TitleCommand._lastCommandSymbol) 
	{
        this.selectSymbol(Window_TitleCommand._lastCommandSymbol);
    }
};

Window_TitleCommand.prototype.makeCommandList = function() {
    for (let i = 0; i < MTM101.EnhancedTitle.TitleOptions.length; i++)
	{
		var titleoption = MTM101.EnhancedTitle.TitleOptions[i];
		if (eval(titleoption.Visible))
		{
			this.addCommand(titleoption.Name, titleoption.Name.concat('_',i), eval(titleoption.Enabled));
		}
	}
};