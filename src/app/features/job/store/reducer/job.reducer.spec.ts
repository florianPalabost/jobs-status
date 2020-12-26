import { jobReducer, initialState } from './job.reducer';

describe('Job Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = jobReducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
