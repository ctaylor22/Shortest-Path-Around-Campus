class Graph:

    # Member Variables
    gdict = None

    # Constructor
    def __init__(self, gdict=None):
        # Initializes Graph Dictionary
        if gdict == None:
            self.gdict = {}
        else:
            self.gdict = gdict

    def get_vertices(self):
        return list(self.gdict.keys())

    def add_vertex(self, vertex):
        # if vertex doesn't already exist add it to the dictionary
        if vertex not in self.gdict:
            self.gdict[vertex] = []
        else:
            raise Exception("Vertex already exists")

    def remove_vertex(self, vertex):

        if vertex not in self.gdict:
            raise Exception("Vertex doesn't Exist")

        for source in self.gdict:
            for destination in self.gdict[source]:
                if destination == vertex:
                    del self.gdict[source][destination]
        
        del self.gdict[vertex]

    def add_edge(self, source, destination, weight):
        # if source is in the dict and also the edge already doesn't exist
        if source not in self.gdict or destination not in self.gdict:
            raise Exception("Invalid Vertices")

        if destination not in self.gdict[source] or source not in self.gdict[destination]:
            self.gdict[source].append({destination : weight})
            self.gdict[destination].append({source : weight})
        else:
            raise Exception("Duplicate Edge")
    
    def remove_edge(self, source, destination):
        if source not in self.gdict or destination not in self.gdict:
            raise Exception("Invalid Vertices")
        
        if destination not in self.gdict[source]:
            raise Exception("No such Edge")

        del self.gdict[source][destination]
        del self.gdict[destination][source]

    def edge_exists(self, source, destination):
        return source in self.gdict and destination in self.gdict[source]

    def get_edge_weight(self, source, destination):
        result = None

        # if source and destination exist... and if it is an edge
        if source in self.gdict and destination in self.gdict and destination in self.gdict[source]:
            result = self.gdict[source][destination]
        else:
            raise Exception("Invalid Vertices")
        
        return result

    def shortest_path_between(self, source, destination):
        pass

    def __str__(self):
        return self.gdict.__str__()

