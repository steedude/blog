export enum Locale {
  ZH_TW = "zh-TW",
  EN = "en",
}

export type Dictionary = {
  site: {
    name: string;
    description: string;
    tagline: string;
    homeLabel: string;
  };
  navigation: {
    recentEntries: string;
    main: string;
    archives: string;
    categories: string;
    tags: string;
    links: string;
  };
  common: {
    all: string;
    articleCount: string;
    relatedArticleCount: string;
    postedBy: string;
    inCategory: string;
    comments: string;
    trackbacks: string;
    published: string;
    updated: string;
    poweredBy: string;
    noPosts: string;
  };
  home: {
    latestPosts: string;
    navigationLabel: string;
    sidebarLabel: string;
    aboutTitle: string;
    aboutText: string;
    searchTitle: string;
    searchLabel: string;
    searchButton: string;
    recentTitle: string;
    monthlyTitle: string;
    friendsTitle: string;
    friendList: string;
    categoryList: string;
    tagList: string;
    syndicate: string;
  };
  recent: {
    title: string;
    description: string;
  };
  archive: {
    title: string;
    description: string;
    monthSuffix: string;
    empty: string;
  };
  categories: {
    title: string;
    description: string;
  };
  tags: {
    title: string;
    description: string;
  };
  friends: {
    title: string;
    description: string;
  };
  search: {
    title: string;
    description: string;
    keyword: string;
    placeholder: string;
    engineLabel: string;
    siteOnly: string;
    submit: string;
    hint: string;
  };
  post: {
    notFound: string;
    tags: string;
  };
};
