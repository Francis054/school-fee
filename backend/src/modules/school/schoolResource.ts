export class SchoolResource {
  static transform(school: any) {
    return {
      id: school.id,
      name: school.name,
      emailAddress: school.emailAddress,
      phoneNumber: school.phoneNumber,
      address: school.address,
      logoUrl: school.logoUrl,
      currency: school.currency,
      verified: school.verified,
      createdAt: school.createdAt,
      updatedAt: school.updatedAt,
    };
  }
}
