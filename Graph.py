import numpy as np
import json

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
            self.gdict[vertex] = {}
        else:
            raise Exception("Vertex already exists")

    def adjacent(self, vertex, handicap=False):
        result = list()
        for key in self.gdict[vertex].keys():
            if handicap:
                if (len(self.gdict[vertex][key]) == 1):
                    result.append(key)
            else:
                result.append(key)

        return result

    def remove_vertex(self, vertex):

        if vertex not in self.gdict:
            raise Exception("Vertex doesn't Exist")

        for source in self.gdict:
            for destination in self.gdict[source]:
                if destination == vertex:
                    del self.gdict[source][destination][0]
        
        del self.gdict[vertex]

    def add_edge(self, source, destination, weight):
        # if source is in the dict and also the edge already doesn't exist
        if source not in self.gdict or destination not in self.gdict:
            raise Exception("Invalid Vertices")

        if destination not in self.gdict[source] or source not in self.gdict[destination]:
            self.gdict[source][destination][0] = weight
            self.gdict[destination][source][0] = weight
        else:
            raise Exception("Duplicate Edge")
    
    def remove_edge(self, source, destination):
        if source not in self.gdict or destination not in self.gdict:
            raise Exception("Invalid Vertices")
        
        if destination not in self.gdict[source]:
            raise Exception("No such Edge")

        del self.gdict[source][destination][0]
        del self.gdict[destination][source][0]

    def edge_exists(self, source, destination):
        return source in self.gdict and destination in self.gdict[source]

    def get_edge_weight(self, source, destination):
        result = None

        # if source and destination exist... and if it is an edge
        if source in self.gdict and destination in self.gdict and destination in self.gdict[source]:
            result = self.gdict[source][destination][0]
        else:
            raise Exception("Invalid Vertices")
        
        return result

    def shortest_path_between(self, source, destination, handicap=False):
        dist = dict()
        parent = dict()
        visited = set()

        dist[source] = 0
        parent[source] = source

        while len(visited) < len(self.get_vertices()):
            current = None
            min_value = np.Infinity

            # Finds closest non visited vertex
            for vertex in dist:
                if vertex not in visited:
                    if dist[vertex] < min_value:
                        current = vertex
                        min_value = dist[vertex]
            
            visited.add(current)

            for other in self.adjacent(current, handicap):
                if other not in visited:
                    new_dist = self.get_edge_weight(current, other) + dist[current]

                    if other not in dist or new_dist < dist[other]:
                        dist[other] = new_dist
                        parent[other] = current

        shortest_path = list()

        new_vertex = destination
        while new_vertex != source:
            shortest_path.append(new_vertex)
            new_vertex = parent[new_vertex]

        shortest_path.append(source)

        shortest_path.reverse()
        
        if handicap:
            shortest_path = [source]
        return shortest_path

    def path_length(self, vertices: list):
        total = 0

        i = 0
        while i < len(vertices) - 1:
            total += self.get_edge_weight(vertices[i], vertices[i + 1])
            i += 1
            
        return total    

    def __str__(self):
        return self.gdict.__str__()

    def load_from_json(filename):
        result = None
        with open(filename, "r") as file:
            json_data = json.load(file)
            
            for source in json_data:
                for destination in json_data[source]:
                    json_data[destination][source] = [json_data[source][destination][0]]

            result = Graph(json_data)
        
        return result