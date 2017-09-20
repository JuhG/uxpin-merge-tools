import { runUXPinCodeCommand } from '../../utils/runUXPinCodeCommand';

beforeAll(() => jest.setTimeout(15000));
afterAll(() => jest.setTimeout(5000);

describe('--summary option integration', () => {
  describe('--summary option prints ', () => {
    it('prints the list of components found in arui-feather example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/arui-feather', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(`amount
app-content
app-menu
app-title
attach
button
calendar
calendar-input
card-input
checkbox
checkbox-group
collapse
copyright
dropdown
email-input
error-page
footer
form
form-field
header
heading
icon
input
input-autocomplete
input-group
isolated-container
label
link
list
masked-input
menu
menu-item
money-input
mq
notification
page
paragraph
phone-input
plate
popup
popup-container-provider
popup-header
radio
radio-group
render-in-container
resize-sensor
select
sidebar
slide-down
spin
support
textarea
theme-provider
user`);
        });
    });

    it('prints the list of components found in nordnet-ui-kit example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/nordnet-ui-kit', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(`alert
animate
avatar
badge
button
dropdown
flag
icon
input
labeled-value
li
logo
pane
radio-group
segmented-control
spinner
table
tbody\n` + // no examples
`td\n` + // no examples
`tfoot\n` + // no examples
`th\n` + // no examples
`thead\n` + // no examples
`tooltip
tr\n` + // no examples
`ul`);
        });
    });

    it('prints the list of components found in polaris example', () => {
      // when
      return runUXPinCodeCommand('resources/repos/polaris', '--summary')
        .then((output) => {
          // then
          expect(output).toContain(`AccountConnection
ActionList
Avatar
Badge
Banner
Breadcrumbs
Button
ButtonGroup
CalloutCard
Caption
Card
Checkbox
Choice
ChoiceList
Collapsible
ColorPicker
Connected
DatePicker
DescriptionList
DisplayText
EmptyState
EventListener
FooterHelp
FormLayout
Heading
Icon
Image
KeyboardKey
KeypressListener
Label
Labelled
Layout
Link
List
Page
PageActions
Pagination
Popover
PositionedOverlay
RadioButton
ResourceList
Scrollable
Select
SettingAction
SettingToggle
Stack
Subheading
Tabs
Tag
TextContainer
TextField
TextStyle
Thumbnail
Tooltip
UnstyledLink
VisuallyHidden`);
        });
    });
  });
});
