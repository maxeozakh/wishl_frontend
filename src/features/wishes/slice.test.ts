import { addWish, addWishList, getWishes, removeWish, wishesSlice } from './slice'

describe('slice', () => {
  describe('reducer', () => {
    const initialState = {
      wishes: [],
    }
    it('should handle initial state', () => {
      const expected = initialState
      expect(wishesSlice.reducer(undefined, { type: 'unknown' })).toEqual(expected)
    })

    it('should handle addWish', () => {
      const payload = {
        title: 'test',
        id: '1',
      }

      const actual = wishesSlice.reducer(initialState, addWish(payload))

      expect(actual).toEqual({
        ...initialState,
        wishes: [payload],
      })
    })

    it('should handle addWishList', () => {
      const payload = [
        {
          title: 'test',
          id: '1',
        },
      ]

      const actual = wishesSlice.reducer(initialState, addWishList(payload))

      expect(actual).toEqual({
        ...initialState,
        wishes: payload,
      })
    })

    it('should handle removeWish', () => {
      const payload = {
        title: 'test',
        id: '1',
      }

      const actual = wishesSlice.reducer(
        {
          ...initialState,
          wishes: [payload],
        },
        removeWish(payload),
      )

      expect(actual).toEqual({
        ...initialState,
        wishes: [],
      })
    })
  })

  describe('actions', () => {
    it('should return the correct action on addWish', () => {
      const payload = {
        title: 'test',
        id: '1',
      }
      const expected = {
        type: 'wishes/addWish',
        payload,
      }

      expect(addWish(payload)).toEqual(expected)
    })

    it('should return the correct action on addWishList', () => {
      const payload = [
        {
          title: 'test',
          id: '1',
        },
      ]
      const expected = {
        type: 'wishes/addWishList',
        payload,
      }

      expect(wishesSlice.actions.addWishList(payload)).toEqual(expected)
    })

    it('should return the correct action on removeWish', () => {
      const payload = {
        title: 'test',
        id: '1',
      }
      const expected = {
        type: 'wishes/removeWish',
        payload,
      }

      expect(wishesSlice.actions.removeWish(payload)).toEqual(expected)
    })

    it('should return the correct action on removeWish', () => {
      const payload = {
        title: 'test',
        id: '1',
      }
      const expected = {
        type: 'wishes/removeWish',
        payload,
      }

      expect(removeWish(payload)).toEqual(expected)
    })
  })

  describe('selectors', () => {
    it('getWishes should return the correct value', () => {
      const state = {
        wishList: {
          wishes: [
            {
              title: 'test',
              id: '1',
            },
          ],
        },
        loader: {
          isLoading: false,
        },
      }

      expect(getWishes(state)).toEqual(state.wishList.wishes)
    })
  })
})
