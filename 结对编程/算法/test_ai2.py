import unittest
from ai2 import *

class Testai2(unittest.TestCase):
    """Test ai2.py"""
    def test_choose(self):
        """Test method choose(player1)"""
        self.assertEqual(([5, 4, 3], 2, 3), choose([[0, 4, 0], [0, 4, 0], [0, 1, 0], [0, 5, 0], [0, 3, 0]]))
        print('\n')
        self.assertEqual(([4, 4, 4], 2, 3), choose([[0, 4, 0], [0, 4, 0], [0, 4, 0], [0, 5, 0], [0, 3, 0]]))
        print('\n')
        self.assertEqual(([4, 4, 4, 4, 4], 3, 5), choose([[0, 4, 0], [0, 4, 0], [0, 4, 0], [0, 4, 0], [0, 4, 0]]))
        print('\n')
        self.assertEqual(([4, 4], 1, 2), choose([[0, 4, 0], [0, 4, 0], [0, 1, 0], [0, 3, 0], [0, 6, 0]]))
        print('\n')
        self.assertEqual(([3, 3], 3, 5), choose([[0, 3, 0], [0, 1, 0], [0, 3, 0], [0, 4, 0], [0, 6, 0]]))
        print('\n')
        self.assertEqual(([1, 2, 3, 4, 5], 3, 5), choose([[0, 1, 0], [0, 3, 0], [0, 4, 0], [0, 2, 0], [0, 5, 0]]))
        print('\n')
        self.assertEqual(([3, 4, 5, 6], 2, 4), choose([[0, 3, 0], [0, 3, 0], [0, 4, 0], [0, 5, 0], [0, 6, 0]]))
        print('\n')
        self.assertEqual(([5, 5, 5, 5], 2, 4), choose([[0, 5, 0], [0, 5, 0], [0, 5, 0], [0, 5, 0], [0, 4, 0]]))
        print('\n')
        self.assertEqual(([6, 6], 1, 2), choose([[0, 6, 0], [0, 4, 0], [0, 6, 0], [0, 1, 0], [0, 2, 0]]))
        print('\n')
        self.assertEqual(([4, 5, 6], 2, 3), choose([[0, 6, 0], [0, 4, 0], [0, 6, 0], [0, 5, 0], [0, 2, 0]]))
        print('\n')
    def test_cal(self):
        self.assertEqual((40, 0, 10, 960, 1040), cal([2, 6, 5, 4, 5], [5, 3, 4, 5, 3], 5, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((150, 0, 10, 850, 1150), cal([6, 4, 3, 2, 2], [5, 6, 6, 5, 5], 5, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((70, 10, 0, 1070, 930), cal([6, 6, 6, 2, 1], [5, 5, 4, 2, 1], 5, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((60, 10, 0, 1060, 940), cal([4, 4, 5, 6, 6], [2, 2, 3, 3, 5], 6, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((75, 0, 10, 925, 1075), cal([1, 1, 1, 4, 5], [4, 5, 6, 6, 6], 5, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((60, 0, 10, 940, 1060), cal([4, 3, 6, 2, 2], [4, 4, 4, 1, 6], 5, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((105, 0, 10, 895, 1105), cal([4, 3, 6, 2, 6], [2, 2, 6, 6, 6], 5, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((180, 10, 0, 1180, 820), cal([4, 6, 3, 5, 6], [6, 3, 6, 2, 1], 5, 1000, 1000, 0, 0))
        print('\n')
        self.assertEqual((42, 10, 0, 1042, 958), cal([4, 4, 4, 1, 2], [4, 3, 6, 2, 3], 6, 1000, 1000, 0, 0))

if __name__ == '__main__':
    unittest.main()