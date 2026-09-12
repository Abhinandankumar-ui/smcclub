import Project from './models/Project.js';
import Member from './models/Member.js';
import Event from './models/Event.js';
import Gallery from './models/Gallery.js';
import Admin from './models/Admin.js';
import ClubInfo from './models/ClubInfo.js';
import bcrypt from 'bcryptjs';

export async function seedInitialData() {
  try {
    // Ensure admin user exists with requested credentials
    const adminEmail = 'smcc@admin.com';
    const adminPasswordPlain = 'smccadmin99';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    const hashedPassword = await bcrypt.hash(adminPasswordPlain, 10);
    if (!existingAdmin) {
      await Admin.create({ email: adminEmail, password: hashedPassword });
      console.log(`Admin user created: ${adminEmail}`);
    } else {
      existingAdmin.password = hashedPassword;
      await existingAdmin.save();
      console.log(`Admin user verified: ${adminEmail}`);
    }

    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.create([
        {
          name: 'Autonomous ROS2 Search & Rescue Rover',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
          description: 'A 4-wheel differential drive rover equipped with RPLIDAR A1, Intel RealSense depth camera, and ROS2 Nav2 stack for autonomous indoor SLAM and obstacle avoidance.',
          technologies: ['ROS2 Humble', 'Python', 'C++', 'LiDAR', 'Nav2', 'Raspberry Pi 4'],
          teamMembers: ['Aarav Sharma', 'Priya Patel', 'Rohan Verma'],
          domain: 'Robotics',
          githubUrl: 'https://github.com',
          demoUrl: '#'
        },
        {
          name: 'LoRaWAN Smart Agriculture & Soil Telemetry',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          description: 'Low-power outdoor sensor nodes measuring soil NPK, moisture, and ambient temperature, transmitting over 12km via LoRaWAN to a real-time Grafana cloud dashboard.',
          technologies: ['ESP32', 'LoRa SX1276', 'MQTT', 'InfluxDB', 'FreeRTOS'],
          teamMembers: ['Neha Kulkarni', 'Amit Singh'],
          domain: 'IoT',
          githubUrl: 'https://github.com',
          demoUrl: '#'
        },
        {
          name: 'Vision-Guided Quadcopter Drone',
          image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
          description: 'Custom carbon-fiber drone carrying a Raspberry Pi Zero 2W running YOLOv8-nano for real-time person detection, autonomous waypoint navigation, and safety failsafes.',
          technologies: ['Pixhawk 4', 'YOLOv8', 'OpenCV', 'Python', 'MAVLink'],
          teamMembers: ['Vikram Malhotra', 'Sanya Gupta'],
          domain: 'Drone/CV',
          githubUrl: 'https://github.com',
          demoUrl: '#'
        },
        {
          name: 'STM32 Ultra-Low Power Industrial Logger',
          image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80',
          description: 'Custom 2-layer PCB designed in KiCAD with STM32L4 microcontroller, featuring DMA SPI logging to onboard Flash memory and BLE debugging.',
          technologies: ['STM32', 'KiCAD', 'Embedded C', 'FreeRTOS', 'SPI/I2C'],
          teamMembers: ['Devansh Mehra', 'Kavya Nair'],
          domain: 'Embedded Systems',
          githubUrl: 'https://github.com',
          demoUrl: '#'
        },
        {
          name: 'Edge-AI Automated Defect Sorting Conveyor',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          description: 'High-speed industrial sorter using Raspberry Pi and a pneumatic solenoid actuator to classify manufactured items with 98.4% visual accuracy in under 60ms.',
          technologies: ['Raspberry Pi', 'TensorFlow Lite', 'Python', 'Pneumatics', 'PLC'],
          teamMembers: ['Arjun Das', 'Meera Joshi'],
          domain: 'Automation',
          githubUrl: 'https://github.com',
          demoUrl: '#'
        },
        {
          name: '6-DOF Precision Robotic Arm with Inverse Kinematics',
          image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&w=800&q=80',
          description: '3D-printed 6-axis manipulator arm controlled via closed-loop stepper motors, inverse kinematics trajectory planning, and hand-gesture recognition.',
          technologies: ['Arduino Mega', 'MediaPipe', 'OpenCV', 'Inverse Kinematics', '3D Printing'],
          teamMembers: ['Siddharth Rao', 'Pooja Reddy'],
          domain: 'Robotics',
          githubUrl: 'https://github.com',
          demoUrl: '#'
        }
      ]);
      console.log('IoT & Robotics projects seeded');
    }

    const memberCount = await Member.countDocuments();
    if (memberCount === 0) {
      await Member.create([
        {
          name: 'Aarav Sharma',
          designation: 'Club President & Robotics Lead',
          technicalDomain: 'Robotics',
          bio: 'ROS2 developer and autonomous navigation enthusiast. 3x national robotics hackathon winner.',
          photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
          socialLinks: { linkedin: '#', github: '#' }
        },
        {
          name: 'Neha Kulkarni',
          designation: 'IoT & Telemetry Lead',
          technicalDomain: 'IoT',
          bio: 'Firmware hacker and LoRaWAN researcher building resilient wireless telemetry systems.',
          photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
          socialLinks: { linkedin: '#', github: '#' }
        },
        {
          name: 'Devansh Mehra',
          designation: 'Embedded Systems Lead',
          technicalDomain: 'Embedded Systems',
          bio: 'PCB designer and STM32/ARM Cortex firmware engineer. KiCAD & hardware debugging mentor.',
          photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          socialLinks: { linkedin: '#', github: '#' }
        },
        {
          name: 'Sanya Gupta',
          designation: 'Drone & Computer Vision Lead',
          technicalDomain: 'Drone/CV',
          bio: 'FPV pilot and OpenCV/Edge-AI researcher specialized in autonomous flight and YOLO tracking.',
          photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80',
          socialLinks: { linkedin: '#', github: '#' }
        },
        {
          name: 'Arjun Das',
          designation: 'Industrial Automation Specialist',
          technicalDomain: 'Automation',
          bio: 'Passionate about smart factories, PLCs, industrial sensors, and mechanical design.',
          photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          socialLinks: { linkedin: '#', github: '#' }
        },
        {
          name: 'Priya Patel',
          designation: 'AI & Sensor Fusion Lead',
          technicalDomain: 'AI/ML',
          bio: 'Specializing in PyTorch, TinyML on microcontrollers, and multi-sensor fusion algorithms.',
          photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          socialLinks: { linkedin: '#', github: '#' }
        }
      ]);
      console.log('Club team members seeded');
    }

    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.create([
        {
          title: 'Hands-on ESP32 & FreeRTOS Workshop',
          date: 'Sep 24, 2026',
          time: '2:00 PM - 5:30 PM',
          location: 'Robotics Lab 3, Tech Block',
          description: 'Deep dive into multi-threading, FreeRTOS queues, semaphore synchronization, and real-time sensor data streaming over WebSockets with ESP32.',
          image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
          category: 'Workshop',
          status: 'Upcoming',
          registrationLink: '/join'
        },
        {
          title: 'Autonomous Mobile Robotics Bootcamp (ROS2)',
          date: 'Oct 10, 2026',
          time: '10:00 AM - 4:00 PM',
          location: 'Auditorium & Innovation Center',
          description: 'Learn robot kinematics, Gazebo simulation, SLAM with 2D LiDAR, and path planning using ROS2 Nav2. Bring your laptops!',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80',
          category: 'Workshop',
          status: 'Upcoming',
          registrationLink: '/join'
        },
        {
          title: 'RoboQuest 2026: Line Following & Obstacle Challenge',
          date: 'Nov 05, 2026',
          time: '9:00 AM - 6:00 PM',
          location: 'Main Sports Complex Arena',
          description: 'Annual inter-college robotics showdown featuring high-speed PID line followers, maze solvers, and robot combat showdowns with cash prizes.',
          image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80',
          category: 'Competition',
          status: 'Upcoming',
          registrationLink: '/join'
        },
        {
          title: 'Drone Pilot Training & Computer Vision Session',
          date: 'Aug 14, 2026',
          time: '3:00 PM - 6:00 PM',
          location: 'College Open Grounds',
          description: 'Hands-on flight telemetry calibration, PID flight stabilization tuning, and OpenCV tracking demonstration with FPV drones.',
          image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80',
          category: 'Past',
          status: 'Completed',
          registrationLink: '#'
        }
      ]);
      console.log('Club events seeded');
    }

    const galleryCount = await Gallery.countDocuments();
    if (galleryCount === 0) {
      await Gallery.create([
        {
          title: 'ESP32 IoT Sensor Hands-on Session',
          category: 'Workshops',
          image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'ROS2 Simulation & Mobile Rover Testing',
          category: 'Project Demonstrations',
          image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'National RoboSoccer Championship Finals',
          category: 'Competitions',
          image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'PCB Soldering & Circuit Assembly Lab',
          category: 'Workshops',
          image: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Autonomous Drone Flight Trials',
          category: 'Project Demonstrations',
          image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80'
        },
        {
          title: 'Club Orientation & Project Showcase Day',
          category: 'Club Activities',
          image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'
        }
      ]);
      console.log('Gallery items seeded');
    }

    const clubInfoCount = await ClubInfo.countDocuments();
    if (clubInfoCount === 0) {
      await ClubInfo.create({
        hero: {
          badge: 'Welcome to Robo-IoT Club • Hardware & Intelligence',
          titlePrefix: 'Innovating at the Core of',
          titleHighlight: 'Robotics & IoT',
          description: 'A premier multidisciplinary hub for engineering enthusiasts passionate about autonomous robotics, embedded microelectronics, telemetry, and intelligent cyber-physical systems.'
        },
        stats: [
          { label: 'Technical Domains', value: '6+', icon: '🦾' },
          { label: 'Hardware Projects', value: '15+', icon: '⚡' },
          { label: 'Active Innovators', value: '80+', icon: '🧠' },
          { label: 'Workshops & Wins', value: '12+', icon: '🏆' }
        ],
        domains: [
          {
            title: 'Robotics',
            icon: '🦾',
            badge: 'Hardware & Kinematics',
            desc: 'Mobile rovers, ROS2 Nav2 stack, 6-DOF robotic arms, kinematics, and SLAM simulation.',
            topics: ['ROS2 Humble & Gazebo Simulation', 'Differential Drive & Ackermann Steering', 'Inverse Kinematics for 6-DOF Manipulators', '2D/3D LiDAR SLAM & Path Planning'],
            color: 'from-violet-500/20 to-purple-500/10',
            border: 'border-violet-500/30'
          },
          {
            title: 'IoT & Telemetry',
            icon: '📡',
            badge: 'Telemetry & Cloud',
            desc: 'ESP32, LoRaWAN, MQTT protocols, cloud dashboards, and smart environmental sensor grids.',
            topics: ['ESP32 & NodeMCU Firmware Development', 'MQTT, HTTP REST, & WebSockets Protocols', 'LoRaWAN Long-Range Telemetry (10km+)', 'Grafana, Node-RED & AWS IoT Dashboards'],
            color: 'from-cyan-500/20 to-blue-500/10',
            border: 'border-cyan-500/30'
          },
          {
            title: 'Embedded Systems',
            icon: '⚡',
            badge: 'Firmware & Silicon',
            desc: 'STM32 ARM Cortex firmware, KiCAD custom PCB design, FreeRTOS, and microelectronics.',
            topics: ['ARM Cortex-M (STM32) & AVR Microcontrollers', 'Custom PCB Schematic & Layout in KiCAD', 'Real-Time Operating Systems (FreeRTOS)', 'SPI, I2C, UART, CAN Bus Communication'],
            color: 'from-amber-500/20 to-orange-500/10',
            border: 'border-amber-500/30'
          },
          {
            title: 'Edge AI / Machine Learning',
            icon: '🧠',
            badge: 'Edge Intelligence',
            desc: 'TinyML on microcontrollers, sensor fusion, predictive anomaly detection, and YOLO vision.',
            topics: ['TinyML on Edge Hardware (TensorFlow Lite)', 'Multi-Sensor Fusion (Kalman Filtering)', 'Predictive Failure & Anomaly Detection', 'Deep Learning Computer Vision (YOLO)'],
            color: 'from-emerald-500/20 to-teal-500/10',
            border: 'border-emerald-500/30'
          },
          {
            title: 'Industrial Automation',
            icon: '⚙️',
            badge: 'Control & Actuation',
            desc: 'PLC programming, pneumatics, conveyor sorting, SCADA systems, and high-speed actuation.',
            topics: ['PLC Programming (Ladder Logic, FBD)', 'Pneumatic Actuators & Solenoid Control', 'Industrial Sensors & Proximity Transducers', 'Automated Sorters & Assembly Mechanisms'],
            color: 'from-fuchsia-500/20 to-pink-500/10',
            border: 'border-fuchsia-500/30'
          },
          {
            title: 'Drones & Computer Vision',
            icon: '🛸',
            badge: 'Aerial Autonomy',
            desc: 'Autonomous quadcopters, Pixhawk flight controllers, OpenCV object tracking, and aerial mapping.',
            topics: ['Pixhawk & ArduPilot Flight Controllers', 'OpenCV Real-Time Video Processing', 'Autonomous Waypoint Following & Failsafes', 'Aerial Object Detection & Target Tracking'],
            color: 'from-rose-500/20 to-red-500/10',
            border: 'border-rose-500/30'
          }
        ],
        activities: [
          {
            title: 'Hands-on Hardware Workshops',
            icon: '🛠️',
            desc: 'Regular beginner-to-advanced bootcamps covering soldering, PCB fabrication, microcontroller coding, and 3D printing.'
          },
          {
            title: 'National Robotics Competitions',
            icon: '🏆',
            desc: 'Club teams design rovers, combat bots, and autonomous drones to compete at Robocon, IIT Techfests, and national hackathons.'
          },
          {
            title: 'Project Incubation & Research',
            icon: '💡',
            desc: 'Students receive lab access, microcontrollers, components, and peer mentorship to prototype and publish their hardware ideas.'
          },
          {
            title: 'Industry Connect & Guest Talks',
            icon: '🤝',
            desc: 'Networking sessions with embedded systems engineers, robotics researchers, and alumni working in hardware industries.'
          }
        ],
        mission: 'To provide every engineering student with the tools, lab components, and collaborative ecosystem needed to transition from theoretical textbook knowledge to building real-world robots, smart IoT devices, and autonomous cyber-physical systems.',
        vision: 'To establish an internationally recognized student hardware research collective producing open-source robotics innovations, high-impact telemetry research, and entrepreneurial deep-tech ventures.',
        labInfo: {
          location: 'Robotics & IoT R&D Lab, Room 304, Engineering Tech Block',
          email: 'robo-iot@university.edu',
          phone: '+91 98765 43210',
          timings: 'Monday – Saturday: 9:00 AM – 7:00 PM (Project sprints open 24/7)'
        }
      });
      console.log('Club settings & info seeded');
    }
  } catch (err) {
    console.error('Seeding error:', err.message);
  }
}
