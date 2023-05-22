import traci
import signal
import sys

def signal_handler(sig, frame):
    traci.close()
    sys.exit(0)

signal.signal(signal.SIGINT, signal_handler)

sumoCmd = ["/usr/local/bin/sumo", "-c", "/Users/vishaljakhar/Desktop/urban-planning-app/apps/sumo-server/sumo-files/demo/demo.sumocfg"]
traci.start(sumoCmd)
vehicleIDs = traci.vehicle.getIDList()

while traci.simulation.getMinExpectedNumber() > 0:
    traci.simulationStep()

    active_vehicles = traci.vehicle.getIDList()
   
    for vehicle_id in active_vehicles:
        x, y = traci.vehicle.getPosition(vehicle_id)
        print(f"{vehicle_id},{x},{y}")

traci.close()