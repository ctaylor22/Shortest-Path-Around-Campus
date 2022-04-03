from Graph import Graph


def main():
    g = Graph.load_from_json("GeorgeFoxCampus.json")
    # print(g.adjacent("HMS entrance", True))
    print(g.shortest_path_between("HMS entrance", "Hadlock Student Center entrance", True))
    # print(g.path_length(g.shortest_path_between("a", "d")))


main()
