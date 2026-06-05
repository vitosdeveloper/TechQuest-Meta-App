# Criando a Rede Privada (VPC)
resource "aws_vpc" "techquest_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_support   = true
  enable_dns_hostnames = true

  tags = {
    Name = "techquest-vpc"
  }
}

# Subnets Públicas (para os Load Balancers que recebem tráfego da internet)
resource "aws_subnet" "public_1" {
  vpc_id                  = aws_vpc.techquest_vpc.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true
}

resource "aws_subnet" "public_2" {
  vpc_id                  = aws_vpc.techquest_vpc.id
  cidr_block              = "10.0.2.0/24"
  availability_zone       = "us-east-1b"
  map_public_ip_on_launch = true
}

# Subnets Privadas (para os Bancos de Dados, Kafka e os Pods do EKS)
resource "aws_subnet" "private_1" {
  vpc_id            = aws_vpc.techquest_vpc.id
  cidr_block        = "10.0.3.0/24"
  availability_zone = "us-east-1a"
}

resource "aws_subnet" "private_2" {
  vpc_id            = aws_vpc.techquest_vpc.id
  cidr_block        = "10.0.4.0/24"
  availability_zone = "us-east-1b"
}
