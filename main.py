from Graph import Graph

def main():


    g = Graph.load_from_json("GeorgeFoxCampus.json")
    print(g)
    # print(g.path_length(g.shortest_path_between("a", "d")))


main()