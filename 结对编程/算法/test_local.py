import unittest
from local import *

class Testlocal(unittest.TestCase):
    """Test main.py"""
    def test_cal(self):
        """Test method cal(dices_player1, dices_player2, rate, player1, player2, grade_player1, grade_player2)"""
        self.assertEqual((30, 10, 0, 1030, 970), cal([3, 1, 4, 2, 3], [6, 6, 6, 5, 4], 5, 1000, 1000, 0, 0))
        print('\n')
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