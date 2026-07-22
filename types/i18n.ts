export enum Locale {
  ZH_TW = "zh-TW",
  EN = "en",
}

export type PluralMessage = {
  one: string;
  other: string;
};

export type Dictionary = {
  site: {
    name: string;
    description: string;
    tagline: string;
    homeLabel: string;
  };
  navigation: {
    main: string;
    archives: string;
    categories: string;
    projects: string;
    tags: string;
    about: string;
    links: string;
  };
  common: {
    all: string;
    articleCount: PluralMessage;
    relatedArticleCount: PluralMessage;
    postedBy: string;
    inCategory: string;
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
    syndicate: string;
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
  projects: {
    title: string;
    description: string;
    visitSite: string;
    features: string;
    technologies: string;
  };
  search: {
    title: string;
    description: string;
    keyword: string;
    placeholder: string;
    resultCount: PluralMessage;
    empty: string;
  };
  post: {
    notFound: string;
    tags: string;
  };
  notFound: {
    title: string;
    description: string;
    backHome: string;
  };
};
