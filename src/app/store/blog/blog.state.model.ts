import {BlogFeed, BlogItem} from '../../core/models/blog.model';

export const BLOG_STATE_DEFAULTS: BlogMediumStateModel = {
  feed: {
    title: '',
    link: '',
    description: '',
    image: ''
  },
  items: []
};

export interface BlogMediumStateModel {
  feed?: BlogFeed;
  items?: BlogItem[];
}
