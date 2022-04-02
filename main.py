from Graph import Graph

def main():
    g = Graph()

    g.add_vertex("a")
    g.add_vertex("b")
    g.add_vertex("c")
    g.add_vertex("d")

    g.add_edge("a", "b", 5)
    g.add_edge("a", "c", 6)
    g.add_edge("c", "d", 2)
    g.add_edge("b", "d", 4)

    print(g.path_length(g.shortest_path_between("a", "d")))


main()