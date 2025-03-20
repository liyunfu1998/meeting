import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { MeetingRoom } from './entities/meeting-room.entity';
import { CreateMeetingRoomDto } from './dto/create-meeting-room.dto';
import { UpdateMeetingRoomDto } from './dto/update-meeting-room.dto';

@Injectable()
export class MeetingRoomService {
  @InjectRepository(MeetingRoom)
  private repository: Repository<MeetingRoom>;

  @InjectEntityManager()
  entityManager: EntityManager;

  initData() {
    const room1 = new MeetingRoom();
    room1.name = '木星';
    room1.capacity = 10;
    room1.equipment = '白板';
    room1.location = '一层西';

    const room2 = new MeetingRoom();
    room2.name = '金星';
    room2.capacity = 5;
    room2.equipment = '';
    room2.location = '二层东';

    const room3 = new MeetingRoom();
    room3.name = '天王星';
    room3.capacity = 30;
    room3.equipment = '白板，电视';
    room3.location = '三层东';

    this.repository.save([room1, room2, room3]);
  }

  async find(pageNo: number, pageSize: number) {
    if (pageNo < 1) {
      throw new BadRequestException('pageNo不能小于1');
    }

    const skipCount = (pageNo - 1) * pageSize;

    const [meetingRooms, totalCount] = await this.repository.findAndCount({
      skip: skipCount,
      take: pageSize,
    });

    return {
      meetingRooms,
      totalCount,
    };
  }

  async create(meetingRoomDto: CreateMeetingRoomDto) {
    const room = await this.repository.findOneBy({
      name: meetingRoomDto.name,
    });

    if (room) {
      throw new BadRequestException('会议室已存在');
    }

    return await this.repository.save(meetingRoomDto);
  }

  async update(meetingRoomDto: UpdateMeetingRoomDto) {
    const meetingRoom = await this.repository.findOneBy({
      id: meetingRoomDto.id,
    });

    if (!meetingRoom) {
      throw new BadRequestException('会议室不存在');
    }

    meetingRoom.capacity = meetingRoomDto.capacity!;
    meetingRoom.location = meetingRoomDto.location!;
    meetingRoom.name = meetingRoomDto.name!;

    if (meetingRoomDto.description) {
      meetingRoom.description = meetingRoomDto.description;
    }

    if (meetingRoomDto.equipment) {
      meetingRoom.equipment = meetingRoomDto.equipment;
    }

    await this.repository.update(
      {
        id: meetingRoomDto.id,
      },
      meetingRoom,
    );
    return 'success';
  }

  async findById(id: number) {
    return this.repository.findOneBy({
      id,
    });
  }

  async delete(id: number) {
    await this.repository.delete({
      id,
    });
    return 'success';
  }
}
