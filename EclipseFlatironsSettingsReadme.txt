1)  Applying code templates:

Window > Preferences, then Java>Code Style>Code Templates
Import EclipseFlatironsCodeTemplates.xml
Modify class comments to set your user name

2)  Applying Import Order

Window > Preferences, then Java>Code Style>Organize Imports
Import EclipseFlatirons.importorder

3)  Applying cleanup

Window > Preferences, then Java>Code Style>Clean Up
Import EclipseFlatironsCleanupProfile.xml

4)  Applying format preferences

Window > Preferences, then Java>Code Style>Formatter
Import EclipseFlatironsProfile.xml


Note that this doesn't take care of the space vs tab problem.  You have to do that manually.

5)  Fixing space vs tab problem completely

General > Editors > Text Editors
Check Insert spaces for tabs
Web > CSS Files > Editor
Select Indent using spaces and set Indentation size to 4
Web > HTML Files > Editor
Select Indent using spaces and set Indentation size to 4
XML > XML Files > Editor
Select Indent using spaces and set Indentation size to 4

Installing AnyEdit Tools (http://andrei.gmxhome.de/anyedit/) can simplify this and also simplify save actions.

6)  Enabling save actions (unfortunately, there isn't a profile to store for these)

Java > Editor > Save Actions
Check Perform the selected actions on save
DO NOT check Format source code (causes ugliness and can take a long time)
Check Organize Imports
Check Additional Actions
- Code Organizing:  check Remove trailing whitespace (All lines)
- Code Style:  check Use blocks in if/while/for/do statements (Always)
- Code Style:  check Use parentheses in expressions (Always)
- Code Style:  check Use modifier final where possible and select Parameter
- Unnecessary Code: check Remove unused imports
- Unnecessary Code:  (optional) check Remove unused local variables
- Unnecessary Code:  (optional) check Remove unused private members (probably not a good idea until late in development of a class)

7)  Ensuring comments are always provided

Java > Code Style > Code Templates, then check the box for "Automatically add comments for new methods and types"

8)  Changing author name

Java > Code Style > Code Templates, then select Types, click Edit, and update the @author line

9)  (optional) To be able to use Alfresco Maven Archetypes within Eclipse

Window > Preferences > Maven > Archetypes
Add Remote Catalog:
	- Catalog File:  http://maven.alfresco.com/nexus/content/repositories/releases/archetype-catalog.xml
	- Description:  Alfresco Archetypes

10)  To be able to select task types in the Activiti plugin, they have to be added.

Window > Preferences > Activiti > Alfresco Settings
Add to Start event form types:  bpm:startTask
Add to User task form types:  

11)  Applying JavaScript preferences

Window > Preferences, then JavaScript>Code Style>Code Templates
Import EclipseFlatironsJSCodeTemplates.xml
Window > Preferences, then JavaScript>Code Style>Formatter
Import EclipseFlatironsJSFormatterProfile.xml
Window > Preferences, then JavaScript>Code Style>Clean Up
Import EclipseFlatironsJSCleanupProfile.xml
Window > Preferences, then JavaScript>Editor>Save Actions
	- update save actions to match the clean up actions, as desired

12)  Applying XML preferences

Unfortunately, there's no way to save settings for XML files.

Window > Preferences, then XML > XML Files > Editor
Set line length to 132
Select Format comments and Join lines
Select Insert whitespace before closing empty end tags
Select Indent using spaces
Set indentation size to 4
Leave other boxes unselected

13)  (optional) Turning on Eclipse Java Warnings

Window > Preferences, then Java > Compiler > Errors/Warning
I turn on nearly everything which is by default set as Ignore to Warning, except the following:
- Unqualified access to instance field
- Non-externalized strings

4) (optional) Turning on Eclipse JavaDoc Warnings

Window > Preferences, then Java > Compiler > Javadoc
- I set all visibility settings to Private
- I set all options to Warning
- I turn off the ignores
- Be sure Process Javadoc comments is checked

