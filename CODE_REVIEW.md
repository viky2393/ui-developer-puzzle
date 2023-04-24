Code review comments:

1. Removed any as a return type from variable declarations and assigned appropriate return types. -  Fixed

2. Removed a variable declaration on above the component and declared inside the component which was required by only one component. - Fixed

3. Return types of functions are missing. If not returning anything void should be mentioned. - Fixed

4. Root directory of the library should not be mentioned if the library is using other libraries files. - Fixed

5. If nothing to mention on stylesheet, we can remove it. - Fixed

6. Can be a common module and index.ts file for books library.

7. Variable names can be same as service name as camel case in constructor. It can be easily understandable considering in the bigger project. - Fixed 

8. failedRemoveFromReadingList and failedAddToReadingList actions are not implemented. It is only an action created. - Fixed

Accessibility issues form lighthouse on chrome :

1. Button are not having any names to access - Fixed

2. Background and foreground colors do not have a sufficient contrast ratio which results low visibility of text to users. - Fixed

Accessibility issues through manually :

1. Alt value is not provided for image tags - Fixed

2. Some interactive controls are not keyboard focusable - Fixed

3. Custom controls have ARIA roles - Fixed


