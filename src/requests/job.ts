import { gql } from '@apollo/client';

export interface User {
  id: string;
  name: string;
}

export interface Job {
  id: string;
  createdAt: string;
  dueDate: string;
  isEmergency: boolean;
  service: string;
  boatLocation: string;
  boatType: string;
  __user__: User;
}

export interface JobsQuery {
  jobs: Job[];
}

export const jobsQuery = gql`
  query Jobs {
    jobs @rest(type: "Job", path: "all") {
      id
      createdAt
      isEmergency
      service
      boatLocation
      boatType
      dueDate
      __user__
    }
  }
`;