import { Action } from '@ngrx/store';
import { Session } from '../models/session.model';

export enum SessionActionType {
  OPEN_SESSION = '[Session] Login',
  CLOSE_SESSION = '[Session] Logout',
//  CHANGE_LANGUAGE = '[Session] ChangeLanguage',
}

export class OpenSessionAction implements Action {
  readonly type = SessionActionType.OPEN_SESSION;
  constructor(public payload: Session) {}
}

export class CloseSessionAction implements Action {
  readonly type = SessionActionType.CLOSE_SESSION;
  constructor(public payload: Session) {}
}

export type SessionAction = OpenSessionAction;
