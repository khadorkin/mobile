// @flow strict

describe('Compare', () => {
  describe('shallowEqual', () => {
    it('should return true', () => {
      const shallowEqual = require('./equal').default;
      const props = {
        foo: 'bar',
        baz: {
          qux: 'quux'
        }
      };
      const nextProps = {
        foo: 'bar',
        baz: {
          qux: 'quux'
        }
      };
      const result = shallowEqual(props, nextProps)
      expect(result).toBeTruthy();
    });

    it('should return false', () => {
      const shallowEqual = require('./equal').default;
      const props = {
        foo: 'bar',
        baz: {
          qux: 'quux'
        }
      };
      const nextProps = {
        foo: 'bar',
        baz: {
          qux: 'quuux'
        }
      };
      const result = shallowEqual(props, nextProps)
      expect(result).toBeFalsy();
    });
  });
});
