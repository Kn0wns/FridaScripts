# -*- coding: utf-8 -*-
# @Time    : 2022-05-16 22:03
# @Author  : KKings
# @File    : ida.JUMPOUT_patch.py
# @Software: PyCharm
def put_unconditional_branch(source, destination):
    offset = (destination - source - 4) >> 1
    if offset > 2097151 or offset < -2097152:
        raise RuntimeError("Invalid offset")
    if offset > 1023 or offset < -1024:
        instruction1 = 0xf000 | ((offset >> 11) & 0x7ff)
        instruction2 = 0xb800 | (offset & 0x7ff)
        PatchWord(source, instruction1)
        PatchWord(source + 2, instruction2)
    else:
        instruction = 0xe000 | (offset & 0x7ff)
        PatchWord(source, instruction)


put_unconditional_branch(here(), 0xF5D0)
