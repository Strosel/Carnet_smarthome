create table carnet_status (
  window_front VARCHAR(5) NOT NULL,
  window_rear VARCHAR(5) NOT NULL,
  heat VARCHAR(5) NOT NULL,
  battery VARCHAR(5) NOT NULL,
  dist VARCHAR(15) NOT NULL,
  charging VARCHAR(5) NOT NULL,
  address VARCHAR(100),
  locked VARCHAR(10),
  statustime VARCHAR(20),
  PRIMARY KEY (statustime)
)
