import type { Dictionary } from "@/types/i18n";

export const enDictionary: Dictionary = {
  site: {
    name: "jason's blog",
    description: "Notes and experiments on web standards, CSS, JavaScript, and frontend development.",
    tagline: "Observations on web standards, browsers, and frontend development",
    homeLabel: "jason's blog home",
  },
  navigation: {
    main: "Main",
    archives: "Archives",
    categories: "Categories",
    projects: "Projects",
    tags: "Tags",
    about: "About",
    links: "Links",
  },
  common: {
    articleCount: { one: "{count} article", other: "{count} articles" },
    relatedArticleCount: { one: "{count} related article", other: "{count} related articles" },
    published: "Published",
    updated: "Updated",
    noPosts: "There are no posts yet.",
  },
  home: {
    latestPosts: "Latest posts",
    navigationLabel: "Home navigation",
    sidebarLabel: "Site information and post navigation",
    aboutTitle: "About this site",
    aboutText: "I'm Jason, a frontend engineer interested in cybersecurity. I post frontend and security news, development notes, and my own thoughts here from time to time.",
    searchTitle: "Search this site",
    searchLabel: "Search posts",
    searchButton: "Search",
    recentTitle: "Recent posts",
    monthlyTitle: "Monthly archives",
    viewFullArchive: "View full archive",
    friendsTitle: "Blogroll",
    syndicate: "Subscribe via RSS",
    previousPage: "Previous",
    nextPage: "Next",
    pageCount: "Page {current} of {total}",
  },
  about: {
    description: "I'm Jason, a frontend engineer. This blog has frontend and security news, development notes, and websites I've built.",
    paragraphs: [
      "I'm Jason, a frontend engineer with an interest in cybersecurity. I post frontend and security news here from time to time, along with my own thoughts and development notes.",
      "My portfolio has tool websites I've built for working with images and PDFs, resizing images, shortening URLs, and more. Each site has a feature overview, the technologies used, and a link. Feel free to try them out.",
    ],
  },
  archive: {
    title: "Post archive",
    description: "Browse posts by year and month.",
    monthSuffix: "",
    empty: "There are no posts in this month.",
  },
  categories: {
    title: "Categories",
    description: "Browse by primary subject. Each post has one main category to keep the structure clear.",
  },
  tags: {
    title: "All tags",
    description: "Tags describe frameworks, APIs, techniques, and topics across categories.",
  },
  friends: {
    title: "Blogroll",
    description: "Technical sites with consistent writing, clear opinions, and ideas worth revisiting.",
  },
  projects: {
    title: "Projects",
    description: "Production websites and frontend implementations.",
    visitSite: "Visit website",
    features: "Key features",
    technologies: "Technical highlights",
  },
  search: {
    title: "Search posts",
    description: "Search post titles, summaries, categories, and tags on this site.",
    keyword: "Search keywords",
    placeholder: "Enter a technology, framework, or post title",
    resultCount: { one: "{count} post found", other: "{count} posts found" },
    empty: "No matching posts were found.",
  },
  post: {
    notFound: "Post not found",
    category: "Category:",
    tags: "Post tags",
  },
  notFound: {
    title: "Page not found",
    description: "This URL does not exist, or the content has moved.",
    backHome: "Back to home",
  },
};
