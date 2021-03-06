import {Injectable} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {UtilsService} from '../common/services/utils/utils.service';
import {IYear} from './year.model';
import {IYearCalendarConfig} from './year-calendar-config';

@Injectable()
export class YearCalendarService {
  readonly DEFAULT_CONFIG: IYearCalendarConfig = {
    allowMultiSelect: false,
    yearFormat: 'YYYY',
    format: 'YYYY',
    isNavHeaderBtnClickable: false,
    yearBtnFormat: 'YYYY',
    locale: moment.locale(),
    multipleYearsNavigateBy: 10,
    showMultipleYearsNavigation: false
  };

  constructor(private utilsService: UtilsService) {
  }

  getConfig(config: IYearCalendarConfig): IYearCalendarConfig {
    const _config: IYearCalendarConfig = {
      ...this.DEFAULT_CONFIG,
      ...this.utilsService.clearUndefined(config)
    };

    moment.locale(_config.locale);

    return _config;
  }

  generateYear(config: IYearCalendarConfig, year: Moment, selected: Moment[] = null): IYear[][] {
    const index = year.clone().startOf('year');

    return this.utilsService.createArray(3).map(() => {
      return this.utilsService.createArray(4).map(() => {
        const date = index.clone();
        const _year = {
          date,
          selected: !!selected.find(s => index.isSame(s, 'year')),
          currentYear: index.isSame(moment(), 'year'),
          disabled: false, // TODO: this fails to compile: this.isYearDisabled(date, config),
          text: this.getYearBtnText(config, date)
        };

        index.add(1, 'year');
        return _year;
      });
    });
  }

  isYearDisabled(year: IYear, config: IYearCalendarConfig) {
    if (config.min && year.date.isBefore(config.min, 'year')) {
      return true;
    }

    return !!(config.max && year.date.isAfter(config.max, 'year'));
  }

  shouldShowLeft(min: Moment, currentYearView: Moment): boolean {
    return min ? min.isBefore(currentYearView, 'year') : true;
  }

  shouldShowRight(max: Moment, currentYearView: Moment): boolean {
    return max ? max.isAfter(currentYearView, 'year') : true;
  }

  getHeaderLabel(config: IYearCalendarConfig, year: Moment): string {
    if (config.yearFormatter) {
      return config.yearFormatter(year);
    }

    return year.format(config.yearFormat);
  }

  getYearBtnText(config: IYearCalendarConfig, year: Moment): string {
    if (config.yearBtnFormatter) {
      return config.yearBtnFormatter(year);
    }
    return year.format(config.yearBtnFormat);
  }

  getYearBtnCssClass(config: IYearCalendarConfig, year: Moment): string {
    if (config.yearBtnCssClassCallback) {
      return config.yearBtnCssClassCallback(year);
    }

    return '';
  }
}
