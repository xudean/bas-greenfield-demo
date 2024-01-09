import {useBAS} from "@/app/usehooks/useBAS";
import {AttestParams} from "@/app/usehooks/useBAS";

const attestParams:AttestParams =  {
    schemaStr: "string ProofType,string Source,string Content,string Condition,bytes32 SourceUserIdHash,bool Result,uint64 Timestamp,bytes32 UserIdHash",
    schemaUID: "0x5f868b117fd34565f3626396ba91ef0c9a607a0e406972655c5137c6d4291af9",
    data: "0x00000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001c0cd0b6086f9527ec620c97e0c564a7796382c09591b76262c2ded3bfe9d990ed600000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000018cd3138109cd0b6086f9527ec620c97e0c564a7796382c09591b76262c2ded3bfe9d990ed600000000000000000000000000000000000000000000000000000000000000077465737431313100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000774657374313131000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007746573743131310000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000033e3d310000000000000000000000000000000000000000000000000000000000",
    recipient: "0x024e45D7F868C41F3723B13fD7Ae03AA5A181362",
    revocable: false,
    expirationTime: BigInt("1704347708253"),
    isPrivate: false
}

// @ts-ignore
let newVar = await new useBAS().attestOffChainWithGreenField(attestParams);
console.log(newVar)

