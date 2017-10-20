import {TDrops, TOpens} from '../common/types/poistions.type';
import {IDayCalendarConfig} from '../day-calendar/day-calendar-config.model';
import {IMonthCalendarConfig} from '../month-calendar/month-calendar-config';
import {IYearCalendarConfig} from '../year-calendar/year-calendar-config';
import {ITimeSelectConfig} from '../time-select/time-select-config.model';

export interface IDatePickerConfig extends IDayCalendarConfig,
                                           IMonthCalendarConfig,
                                           IYearCalendarConfig,
                                           ITimeSelectConfig {
  closeOnSelect?: boolean;
  closeOnSelectDelay?: number;
  openOnFocus?: boolean;
  openOnClick?: boolean;
  onOpenDelay?: number;
  disableKeypress?: boolean;
  appendTo?: string | HTMLElement;
  inputElementContainer?: HTMLElement;
  drops?: TDrops;
  opens?: TOpens;
  hideInputContainer?: boolean;
}
