/** "CRM & ERP Tools" -> "crm-and-erp-tools" */
export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
