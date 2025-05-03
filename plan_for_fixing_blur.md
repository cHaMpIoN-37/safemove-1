Plan to fix the form blur issue on clicking "Add Student" in src/app/admin/page.tsx:

1. Currently, the blur effect is applied to the entire main element, which includes the modal form and overlay, causing the form to be blurred.

2. To fix this, refactor the JSX structure:
   - Wrap the main content (header, main sections, etc.) inside a div container.
   - Apply the blur and pointer-events-none classes conditionally to this container when showModal is true.
   - Render the modal form and overlay outside this container but still inside the main element.
   
3. This way, only the main content is blurred and disabled, while the modal form remains clear and interactive.

4. No need to change z-index as the form already has a higher z-index than the overlay.

5. Implement the changes by:
   - Adding a div wrapper around the main content inside the main element.
   - Moving the modal form and overlay outside this wrapper.
   - Adjusting the className on the wrapper to apply blur and pointer-events-none when showModal is true.

This approach will make the form unblurred and fix the issue.
