import { gql } from '@apollo/client';

export interface IUser {
  id: number;
  name: string;
}

export interface IJob {
  id: number;
  createdAt: string;
  dueDate: string;
  isEmergency: boolean;
  service: string;
  boatLocation: string;
  boatType: string;
  __user__: IUser;
}

export interface IJobsQuery {
  jobs: IJob[];
}

export interface IJobsQueryVariables {
  rejected?: boolean;
  location?: string;
}

export const jobsQuery = gql`
  query Jobs($rejected: Boolean, $location: String) {
    jobs(rejected: $rejected, location: $location) @rest(type: "Job", path: "all?{args}") {
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

export interface ILocation {
  boatLocation: string;
}

export interface ILocationsQuery {
  locations: ILocation[];
}

export const locationsQuery = gql`
  query Locations {
    locations @rest(type: "Location", path: "locations") {
      boatLocation
    }
  }
`;

export interface IAcceptMutation {
  input: {
    id: number;
  }
}

export interface IAcceptMutationVariables {
  input: {
    id: number;
  }
}

export const acceptMutation = gql`
  fragment AcceptInput on REST {
    id: Int
  }
  mutation AcceptJob($input: AcceptInput!) {
    acceptJob(input: $input)
      @rest(
        type: "Job"
        path: "accept"
        method: "POST"
      ) {
        id
      }
  }
`;

export interface IRejectMutation {
  input: {
    id: number;
  }
}

export interface IRejectMutationVariables {
  input: {
    id: number;
  }
}

export const rejectMutation = gql`
  fragment RejectInput on REST {
    id: Int
  }
  mutation RejectJob($input: RejectInput!) {
    rejectJob(input: $input)
      @rest(
        type: "Job"
        path: "reject"
        method: "POST"
      ) {
        id
      }
  }
`;