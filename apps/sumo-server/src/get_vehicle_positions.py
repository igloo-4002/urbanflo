import traci.constants as tc
import traci


sumoCmd = ["/usr/local/bin/sumo", "-c", "/Users/vishaljakhar/Desktop/urban-planning-app/apps/sumo-server/sumo-files/demo/demo.sumocfg"]
traci.start(sumoCmd)
vehicleIDs = traci.vehicle.getIDList()

while traci.simulation.getMinExpectedNumber() > 0:
    traci.simulationStep()

    active_vehicles = traci.vehicle.getIDList()

    for vehicle_id in active_vehicles:
        position = traci.vehicle.getPosition(vehicle_id)
        print(f"Vehicle {vehicle_id} is at position {position}")

# traci.close()
# traci.vehicle.subscribe("0", (tc.VAR_ROAD_ID, tc.VAR_LANEPOSITION))
# positions = []
# for step in range(500):
#     traci.simulationStep()
#     positions.append(traci.vehicle.getPosition("0"))

# print(positions)
traci.close()