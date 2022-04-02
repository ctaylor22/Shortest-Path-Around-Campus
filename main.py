import imp
from Graph import Graph

def main():
    g = Graph()

    g.add_vertex("a")
    g.add_vertex("b")
    g.add_vertex("c")
    g.add_vertex("d")
    g.add_vertex("e")
    g.add_vertex("f")

    g.add_edge("a", "b", 5)

    print(g)

main()