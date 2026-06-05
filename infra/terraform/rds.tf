# Grupo de subnets para o RDS (O banco deve ficar nas redes privadas)
resource "aws_db_subnet_group" "rds_subnet_group" {
  name       = "techquest-rds-subnets"
  subnet_ids = [aws_subnet.private_1.id, aws_subnet.private_2.id]
}

# Instância do banco de dados relacional (PostgreSQL)
resource "aws_db_instance" "postgres" {
  identifier           = "techquest-db"
  engine               = "postgres"
  engine_version       = "15.3"
  instance_class       = "db.t3.micro"
  allocated_storage    = 20
  
  db_name              = "techquest_db"
  username             = "techquest"
  password             = "techquest_password_super_secreta_123" # Em produção, usar AWS Secrets Manager!
  
  db_subnet_group_name = aws_db_subnet_group.rds_subnet_group.name
  skip_final_snapshot  = true # Deletar rápido sem pedir backup final (útil pra ambientes de dev)
  publicly_accessible  = false # O banco é privado, apenas a aplicação acessa
}
