# How Kloudlite Works?

Kloudlite operates through a sophisticated interplay between a frontend management layer and backend Kubernetes operators running on tenant clusters. Here's a more detailed breakdown:

1. **Frontend Management Layer**: The frontend management layer is the primary interface for developers and platform engineers. It provides a comprehensive dashboard where users can manage all aspects of their infrastructure. This includes setting up clusters, initializing projects, managing databases, and configuring applications.

   One of the key features of the management layer is its ability to create new clusters and node-pools on desired cloud providers. This flexibility allows users to leverage the benefits of different cloud environments based on their specific needs.

   The management layer communicates with the tenant clusters via specialized agents. These agents facilitate real-time communication, ensuring that commands issued from the management layer are promptly executed in the tenant clusters. This bidirectional communication allows for efficient management and monitoring of the infrastructure.

2. **Backend Kubernetes Operators**: The backend of Kloudlite is powered by Kubernetes operators that reside in the tenant clusters. These operators are essentially software extensions to Kubernetes that make use of custom resources to manage applications and their components.

   The operators are responsible for setting up and managing workloads and environments based on the instructions received from the management layer. They automate a variety of tasks, such as deploying applications, scaling resources based on demand, and managing the lifecycle of complex applications.

   The operators ensure that the state of the tenant clusters matches the desired state defined by the users through the management layer. They continuously monitor the clusters and make necessary adjustments to maintain the desired state, thereby ensuring the efficient operation of the infrastructure.

In essence, Kloudlite works by providing a seamless and efficient interface between the user-facing management layer and the backend Kubernetes operators. This design allows Kloudlite to automate complex tasks, handle the heavy lifting of infrastructure management, and provide developers and platform engineers with a simplified, efficient, and powerful platform for software delivery.