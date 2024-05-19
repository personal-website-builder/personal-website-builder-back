export enum DomainEventName {
  // Auth
  AUTH_TOKEN_REFRESHED = 'auth.token.refreshed',
  AUTH_USER_REGISTERED = 'auth.user.registered',
  AUTH_USER_LOGGED_IN = 'auth.user.logged.in',

  // Users
  USER_DETAILS_SAVED = 'user.details.saved',
  USER_DETAIL_AVATAR_SAVED = 'user.detail.avatar.saved',
  USER_DETAIL_COVER_SAVED = 'user.detail.cover.saved',
}
