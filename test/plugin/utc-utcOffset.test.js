import MockDate from 'mockdate'
import moment from 'moment'
import dayjs from '../../src'
import utc from '../../src/plugin/utc'

dayjs.extend(utc)

beforeEach(() => {
  MockDate.set(new Date())
})

afterEach(() => {
  MockDate.reset()
})

it('Set utcOffset -> Get utcOffset', () => {
  expect(dayjs().utcOffset(540).utcOffset()).toBe(moment().utcOffset(540).utcOffset())
  expect(dayjs().utcOffset(540).format()).toBe(moment().utcOffset(540).format())
  expect(dayjs().utcOffset(60).format()).toBe(moment().utcOffset(60).format())
  expect(dayjs().utcOffset(8).format()).toBe(moment().utcOffset(8).format())

  expect(dayjs().utcOffset(-540).utcOffset()).toBe(moment().utcOffset(-540).utcOffset())
  expect(dayjs().utcOffset(-540).format()).toBe(moment().utcOffset(-540).format())

  expect(dayjs().utcOffset(-60).format()).toBe(moment().utcOffset(-60).format())
  expect(dayjs().utcOffset(-8).format()).toBe(moment().utcOffset(-8).format())
})

it('valueOf, toDate, toString, toISOString should be the same as original', () => {
  const d = dayjs()
  const du = dayjs().utcOffset(9)
  const mu = moment().utcOffset(9)
  expect(d.valueOf()).toBe(du.valueOf())
  expect(du.valueOf()).toBe(mu.valueOf())
  expect(d.toDate()).toEqual(du.toDate())
  expect(du.toDate()).toEqual(mu.toDate())
  expect(du.toISOString()).toEqual(mu.toISOString())
  expect(d.toString()).toEqual(d.toString())
})

it('clone', () => {
  const du = dayjs().utcOffset(9)
  const du2 = du.clone()
  expect(du.valueOf()).toBe(du2.valueOf())
  expect(du.format()).toBe(du2.format())
})

it('immutable', () => {
  const d = dayjs()
  const du = d.utcOffset(9)
  expect(d.utcOffset()).not.toBe(du.utcOffset())
  expect(d.format()).not.toBe(du.format())
})

it('utcOffset(0) enable utc mode', () => {
  expect(dayjs().utcOffset(0).format()).toBe(moment().utcOffset(0).format())
  expect(dayjs().utcOffset(0).isUTC()).toBeTruthy()
})
