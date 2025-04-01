import PocketBase from 'pocketbase';

// Initialize PocketBase client
const pb = new PocketBase('https://pocketmp3.fly.dev');

// Export the client for direct use if needed
export { pb };

// Example function to get polling stations
export async function getPollingStations(page = 1, perPage = 50, filter = '') {
  try {
    const resultList = await pb.collection('polling_station').getList(page, perPage, {
      filter: filter,
    });
    return { success: true, data: resultList };
  } catch (error) {
    console.error('Error fetching polling stations:', error);
    return { success: false, error };
  }
}

// Get all polling stations
export async function getAllPollingStations(sortField = '-created') {
  try {
    const records = await pb.collection('polling_station').getFullList({
      sort: sortField,
    });
    return { success: true, data: records };
  } catch (error) {
    console.error('Error fetching all polling stations:', error);
    return { success: false, error };
  }
}

// Get a specific polling station by filter
export async function getPollingStationByFilter(filter: string) {
  try {
    const record = await pb.collection('polling_station').getFirstListItem(filter, {
      expand: 'relField1,relField2.subRelField',
    });
    return { success: true, data: record };
  } catch (error) {
    console.error('Error fetching polling station by filter:', error);
    return { success: false, error };
  }
}

// Get a specific polling station by ID
export async function getPollingStation(id: string) {
  try {
    const record = await pb.collection('polling_station').getOne(id);
    return { success: true, data: record };
  } catch (error) {
    console.error('Error fetching polling station:', error);
    return { success: false, error };
  }
}

// Get a registered voter by ID
export async function getRegisteredVoter(id: string) {
  try {
    const record = await pb.collection('registered_voters').getOne(id);
    return { success: true, data: record };
  } catch (error) {
    console.error('Error fetching registered voter:', error);
    return { success: false, error };
  }
}

// Verify voter by ID type and number
export async function verifyVoter(idType: string, idNumber: string) {
  try {
    let filter = '';
    
    // Create the appropriate filter based on ID type
    if (idType === 'national') {
      filter = `national_id_number="${idNumber}"`;
    } else if (idType === 'voter') {
      filter = `voter_card_number="${idNumber}"`;
    } else if (idType === 'passport') {
      filter = `passport_id_number="${idNumber}"`;
    }
    
    // Fetch the voter record
    const record = await pb.collection('registered_voters').getFirstListItem(filter, {
      expand: 'polling_station_id',
    });
    
    return { success: true, data: record };
  } catch (error) {
    console.error('Error verifying voter:', error);
    return { success: false, error };
  }
}