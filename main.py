from Graph import Graph

def test(x: str):
    result = "NO"
    if x.__eq__("1"):
        result = "Yes"

    return result

def main():

    test("1")
    # print(g.path_length(g.shortest_path_between("a", "d")))


main()