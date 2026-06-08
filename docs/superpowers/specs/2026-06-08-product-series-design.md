# Product Series Design

## Goal

Add clear product-series entry cards to the Products page and correct the first contact QR label from WeChat to WhatsApp.

## Design

- Use three fixed series: `tower-cranes`, `truck-cranes`, and `other-equipment`.
- Show three responsive cards above the product grid. Selecting a card filters the existing grid and displays the selected series title and product count.
- Treat products without a category as `tower-cranes` so existing Blob records remain compatible.
- Add a series selector to the admin product form and persist the category through POST and PUT.
- Keep the current QR image and phone number, but label the first contact method as WhatsApp in every language.

## Acceptance Criteria

- Existing products appear under Tower Cranes without a data migration.
- Admin users can create or edit a product's series.
- Empty categories show a localized empty state instead of all products.
- Product cards, inquiry links, responsive layout, and language switching continue to work.
- The contact page no longer presents the first QR code as WeChat.

