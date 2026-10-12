import type { SearchableArticle } from '@utils/searchTypes'

export const renderSearchResultItem = (item: SearchableArticle): string =>
  `<li><a class="block w-full px-4 py-1 hover:bg-card-main focus:bg-card-main focus:ring-2 focus:ring-focus-main focus:outline-hidden focus:ring-inset" data-link="internal" data-astro-prefetch="hover" target="_self" href="${item.pathname}">${item.frontmatter.title}</a></li>`
