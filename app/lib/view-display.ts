/**
 * View counts are only shown once they are worth showing. A public "3 views"
 * reads as negative social proof, so small counts are hidden instead.
 */
export const MIN_VISIBLE_VIEWS = 50;

export const showViews = (views: number | undefined): views is number =>
  (views ?? 0) >= MIN_VISIBLE_VIEWS;
