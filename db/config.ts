import { column, defineDb, defineTable, NOW } from 'astro:db';

const Query = defineTable({
  columns: {
    web_page_url: column.text(),
    searchedAt: column.date({ default: NOW, optional: true }),
  }
})
// https://astro.build/db/config
export default defineDb({
  tables: {
    Query
  }
});
